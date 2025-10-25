import React, { useEffect, useState, useMemo } from "react";
import { Card, Row } from "antd";
import { Line, Pie } from "@ant-design/charts";
import moment from "moment";
import TransactionSearch from "./TransactionSearch";
import Header from "./Header";
import AddIncomeModal from "./Modals/AddIncome";
import AddExpenseModal from "./Modals/AddExpense";
import Cards from "./Cards";
import NoTransactions from "./NoTransactions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { unparse } from "papaparse";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const navigate = useNavigate();

  // ---------------------- Transaction Logic ----------------------

  const onFinish = (values, type) => {
    const newTransaction = {
      type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many = false) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      try {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        const transactionsArray = [];
        querySnapshot.forEach((docSnap) => {
          transactionsArray.push({ id: docSnap.id, ...docSnap.data() });
        });
        setTransactions(transactionsArray);
        toast.success("Transactions Fetched!");
      } catch (e) {
        toast.error("Error fetching transactions");
        console.error(e);
      }
    }
    setLoading(false);
  }

  async function reset() {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      for (const docSnap of querySnapshot.docs) {
        await deleteDoc(doc(db, `users/${user.uid}/transactions`, docSnap.id));
      }
      setTransactions([]);
      setIncome(0);
      setExpenses(0);
      setCurrentBalance(0);
      toast.success("All transactions reset!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to reset transactions");
    }
    setLoading(false);
  }

  // ---------------------- Computations ----------------------

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") incomeTotal += transaction.amount;
      else expensesTotal += transaction.amount;
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // ---------------------- Chart Data ----------------------

  const processChartData = () => {
    const balanceData = [];
    const spendingData = {};

    transactions.forEach((transaction) => {
      const monthYear = moment(transaction.date).format("MMM YYYY");
      const tag = transaction.tag;

      // balance chart
      const existingMonth = balanceData.find((d) => d.month === monthYear);
      if (existingMonth) {
        existingMonth.balance +=
          transaction.type === "income"
            ? transaction.amount
            : -transaction.amount;
      } else {
        balanceData.push({
          month: monthYear,
          balance:
            transaction.type === "income"
              ? transaction.amount
              : -transaction.amount,
        });
      }

      // spending pie chart
      if (transaction.type === "expense") {
        spendingData[tag] = (spendingData[tag] || 0) + transaction.amount;
      }
    });

    const spendingDataArray = Object.keys(spendingData).map((key) => ({
      category: key,
      value: spendingData[key],
    }));

    return { balanceData, spendingDataArray };
  };

  const { balanceData, spendingDataArray } = useMemo(
    () => processChartData(),
    [transactions]
  );

  // ---------------------- Chart Config ----------------------

  const balanceConfig = useMemo(
    () => ({
      data: balanceData,
      xField: "month",
      yField: "balance",
      smooth: true,
      height: 300,
      color: "#1677ff",
    }),
    [balanceData]
  );

  const spendingConfig = useMemo(
    () => ({
      data: spendingDataArray,
      angleField: "value",
      colorField: "category",
      radius: 1,
      label: { type: "inner", offset: "-30%", content: "{value}" },
    }),
    [spendingDataArray]
  );

  // ---------------------- Utility ----------------------

  const exportToCsv = () => {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardStyle = {
    boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
    margin: "2rem",
    borderRadius: "0.5rem",
    minWidth: "400px",
    flex: 1,
  };

  // ---------------------- Render ----------------------

  return (
    <div className="dashboard-container">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Cards
            currentBalance={currentBalance}
            income={income}
            expenses={expenses}
            showExpenseModal={() => setIsExpenseModalVisible(true)}
            showIncomeModal={() => setIsIncomeModalVisible(true)}
            cardStyle={cardStyle}
            reset={reset}
          />

          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={() => setIsExpenseModalVisible(false)}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={() => setIsIncomeModalVisible(false)}
            onFinish={onFinish}
          />

          {transactions.length === 0 ? (
            <NoTransactions />
          ) : (
            <>
              <Row gutter={16}>
                <Card bordered={true} style={cardStyle}>
                  <h2>Financial Statistics</h2>
                  <Line {...balanceConfig} />
                </Card>

                <Card bordered={true} style={{ ...cardStyle, flex: 0.45 }}>
                  <h2>Total Spending</h2>
                  {spendingDataArray.length === 0 ? (
                    <p>Seems like you haven't spent anything yet...</p>
                  ) : (
                    <Pie {...spendingConfig} />
                  )}
                </Card>
              </Row>
            </>
          )}

          <TransactionSearch
            transactions={transactions}
            exportToCsv={exportToCsv}
            fetchTransactions={fetchTransactions}
            addTransaction={addTransaction}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
