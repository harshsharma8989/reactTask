import "./App.css";
import { Card, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
function App() {
  const [dropdownValue, setDropdownValue] = useState("INR");
  const [conversionRate, setConversionRate] = useState(null);
  const productList = [
    {
      productImageUrl:
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      name: "cocooil",
      price: 85.0,
    },
    {
      productImageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      name: "headphones",
      price: 165.0,
    },
    {
      productImageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      name: "watch",
      price: 500.0,
    },
  ];

  const getExchangeRates = () => {
    fetch(
      "https://v6.exchangerate-api.com/v6/11c825490e978353cb652ae3/latest/INR"
    )
      .then((response) => response.json())
      .then((data) => setConversionRate(data.conversion_rates.USD));
  };

  useEffect(() => {
    getExchangeRates();
  }, []);

  return (
    <>
      <div className="main">
        <h1>product list</h1>
        {""}
        {""}
        <Dropdown style={{ float: "right" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            currency
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setDropdownValue("INR");
              }}
            >
              INR
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setDropdownValue("USD");
              }}
            >
              USD
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div style={{ display: "flex" }}>
          {productList.map((o) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                style={{ maxWidth: "200px", maxHeight: "200px" }}
                variant="top"
                src={o.productImageUrl}
              />
              <Card.Body>
                <Card.Title>{o.name} </Card.Title>
                <Card.Text>
                  {dropdownValue === "INR" ? (
                    <p>INR {o.price}</p>
                  ) : (
                    <p>$ {o.price * conversionRate}</p>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
