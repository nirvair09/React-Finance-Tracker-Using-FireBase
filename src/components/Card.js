import { Card, Row } from "antd";

function Cards({
    currentBalance,
    income,
    expenses,
    showExpenseModal,
    showIncomeModal,
    cardStyle,
    reset,

}) {
    return (
        <Row
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "space-between",
            }}>
            <Card bordered={true} style={cardStyle} >
                <h2>Current Balance</h2>
                <p>${currentBalance}</p>
                <div class="btn btn-blue" style={{ margin: 0 }} onCLick={reset}>
                    Reset Balance
                </div>

            </Card>


            <Card bordered={true} style={cardStyle} >
                <h2>Total Income</h2>
                <p>${income}</p>
                <div class="btn btn-blue" style={{ margin: 0 }} onCLick={showIncomeModal}>
                    Add Income
                </div>

            </Card>


            <Card bordered={true} style={cardStyle} >
                <h2>Total Expense</h2>
                <p>${expenses}</p>
                <div class="btn btn-blue" style={{ margin: 0 }} onCLick={showExpenseModal}>
                    Add Expense
                </div>

            </Card>
        </Row>
    )
}

export default Cards;