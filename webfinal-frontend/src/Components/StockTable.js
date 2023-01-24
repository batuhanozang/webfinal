import "../Assets/Stocktable.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

function StockTable() {
  const [newItemName, setnewItemName] = useState("");
  const [newItemType, setnewItemType] = useState("");
  const [newItemCount, setnewItemCount] = useState(0);
  const [changed, setChanged] = useState(false);
  const [tempCount, setTempCount] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [cookies, setCookie] = useCookies(["authorization"]);

  const options = {
    headers: {
      authorization: cookies.authorization,
    },
  };

  const dotmenuClick = (dataId) => {
    let id = "data-id-" + dataId;
    document.querySelectorAll(".table-data-overlay").forEach((e) => {
      if (e.parentElement.id !== id) e.classList.remove("Open");
    });

    let overlay = document.getElementById(id).children[5];
    if (overlay.className.includes("Open")) {
      overlay.classList.remove("Open");
    } else {
      overlay.classList.add("Open");
    }
  };

  const addNewOverlay = () => {
    if (document.querySelector(".overlay-add-new").className.includes("Open")) {
      document.querySelector(".overlay-add-new").classList.remove("Open");
    } else {
      document.querySelector(".overlay-add-new").classList.add("Open");
    }
  };

  const addNewItem = () => {
    let body = {
      type: newItemType,
      name: newItemName,
      count: newItemCount,
    };
    axios
      .post("http://localhost:9000/stock/addtostock", body, options)
      .then((result) => {
        document.querySelector(".overlay-add-new").classList.remove("Open");
        alert("Stock Added Sucessfuly")
        getStockData();
      })
      .catch((err) => {
        console.log(err);
        console.log("Cannot Add New Item");
      });
  };

  const getStockData = () => {
    axios
      .get("http://localhost:9000/stock/getAllItems", options)
      .then((result) => {
        setStockData(result.data);
      })
      .catch((err) => {
        console.log("Cannot Add New Item");
      });
  };

  const updateHandler = (dataId) => {
    let parsedDataId = dataId
    let count = parseInt(document.querySelector(`input#data-id-${dataId}`).value) 
    let body = {
      id: parsedDataId,
      count: count
    };
    axios
      .post("http://localhost:9000/stock/updatestock", body, options)
      .then((result) => {
        alert("Stock Updated!")
        setChanged(true)
      })
      .catch((err) => {
        console.log(err);
        console.log("Cannot Add New Item");
      });
  };
  const deleteHandler = (dataId) => {
    let parsedDataId = dataId
    let body = {
      id: parsedDataId
    };
    axios
      .post("http://localhost:9000/stock/removefromstock", body, options)
      .then((result) => {
        alert("Stock Removed!")
        setChanged(true)
      })
      .catch((err) => {
        console.log(err);
        console.log("Cannot Add New Item");
      });
  };
  

  const TableData = (props_inner) => {
    return (
      <div className="table-data" id={"data-id-" + props_inner.id}>
        <div className="table-data-field">{props_inner.type}</div>
        <div className="table-data-field">{props_inner.name}</div>
        <div className="table-data-field">{props_inner.last_updater}</div>
        <div className="table-data-field">{props_inner.creator_user}</div>
        <div className="table-data-field">{props_inner.count}</div>
        <div className="table-data-overlay">
          <div className="overlay-container">
            <input
              id={"data-id-" + props_inner.id}
              type="number"
            />
          </div>
          <div className="overlay-container">
            <div
              className="update-button"
              onClick={() => updateHandler(props_inner.id)}
            >
              UPDATE
            </div>
            <div className="delete-button" onClick={() => deleteHandler(props_inner.id)}>
              DELETE
            </div>
          </div>
        </div>

        <div
          className="table-data-dotmenu"
          onClick={() => {
            dotmenuClick(props_inner.id);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    getStockData();
  }, []);
  useEffect(() => {
    getStockData();
  }, [changed]);

  return (
    <>
      <div className="button-container">
        <div className="addButton" onClick={addNewOverlay}>
          Add New Item
        </div>
        <div className="overlay-add-new">
          <div className="overlay-field">
            <div className="overlay-label">Type: </div>
            <input
              className="overlay-input"
              onChange={(e) => setnewItemType(e.target.value)}
            ></input>
          </div>
          <div className="overlay-field">
            <div className="overlay-label">Name: </div>
            <input
              className="overlay-input"
              onChange={(e) => setnewItemName(e.target.value)}
            ></input>
          </div>
          <div className="overlay-field">
            <div className="overlay-label">Count: </div>
            <input
              type="number"
              className="overlay-input"
              onChange={(e) => setnewItemCount(e.target.value)}
            ></input>
          </div>
          <div className="overlay-button">
            <div className="submit-new-item" onClick={addNewItem}>
              Add New Item
            </div>
          </div>
        </div>
      </div>
      <div className="stock-table">
        <div className="table-header">
          <div className="table-data-field">Type</div>
          <div className="table-data-field">Name</div>
          <div className="table-data-field">Last Update</div>
          <div className="table-data-field">Creator User</div>
          <div className="table-data-field">Count</div>
        </div>
        <div className="table-body">
          {stockData.map((e, index) => {
            return (
              <TableData
                key={index}
                name={e.name}
                type={e.type}
                count={e.count}
                creator_user={e.creator_user}
                last_updater={e.last_updater}
                id={e.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default StockTable;
