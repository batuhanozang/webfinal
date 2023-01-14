import "../Assets/Stocktable.css";
import { useEffect, useState } from "react";
import axios from "axios";

function StockTable() {
  const [newItemName, setnewItemName] = useState("");
  const [newItemType, setnewItemType] = useState("");
  const [newItemCount, setnewItemCount] = useState(0);
  const [stockData, setStockData] = useState([]);
  

  const dotmenuClick = (dotmenudom) => {

    document.querySelectorAll(".table-data-overlay").forEach(e => {
      e.classList.remove("Open")
    })
    

    if(dotmenudom.nativeEvent.path[0].className === ""){
      let overlay = dotmenudom.nativeEvent.path[2].children[dotmenudom.nativeEvent.path[2].children.length-2]
      if(overlay.className.includes("Open")){
        overlay.classList.remove("Open")
      }else{
        overlay.classList.add("Open")
      }

    }else if(dotmenudom.nativeEvent.path[0].className === "table-data-dotmenu"){
      let overlay = dotmenudom.nativeEvent.path[1].children[5]
      if(overlay.className.includes("Open")){
        overlay.classList.remove("Open")
      }else{
        overlay.classList.add("Open")
      }
      
    }
  }
  
  const addNewOverlay = () => {
    if(document.querySelector(".overlay-add-new").className.includes("Open")){
      document.querySelector(".overlay-add-new").classList.remove("Open")
    }
    else{
      document.querySelector(".overlay-add-new").classList.add("Open")
    }
    
  }

  const addNewItem = () => {
    let body = {
      type: newItemType,
      name: newItemName,
      count: newItemCount
    }
    axios
    .post("http://localhost:9000/stock/addtostock", body)
    .then((result) => {
      document.querySelector(".overlay-add-new").classList.remove("Open")
      getStockData()
    })
    .catch((err) => {
      console.log("Cannot Add New Item");
    });
    
  }

  const getStockData = () => {
    axios
    .get("http://localhost:9000/stock/getAllItems")
    .then((result) => {
      setStockData(result.data)
    })
    .catch((err) => {
      console.log("Cannot Add New Item");
    });
  }

  const TableData = (props_inner) => {
    return (
      <div className="table-data">
          <div className="table-data-field">{props_inner.type}</div>
          <div className="table-data-field">{props_inner.name}</div>
          <div className="table-data-field">{props_inner.count}</div>
          <div className="table-data-field">Ayşe</div>
          <div className="table-data-field">Ayşe</div>
          <div className="table-data-overlay">
            <div className="overlay-container">
              <div id="count-minus" className="count-buttons">-</div>
              <div>{props_inner.count}</div>
              <div id="count-plus" className="count-buttons">+</div>
            </div>
            <div className="overlay-container">
              <div className="delete-button">
                DELETE
              </div>
              
            </div>
          </div>

          <div className="table-data-dotmenu" onClick={dotmenuClick}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
    );
  };


  useEffect(() => {
    getStockData()
  }, []);

  return (
    <>
    
    <div className="button-container">
      <div className="addButton" onClick={addNewOverlay}>
        Add New Item
      </div>
      <div className="overlay-add-new">
        <div className="overlay-field">
          <div className="overlay-label">Type: </div>
          <input className="overlay-input" value={newItemType || ""} onChange={newItemTypeInner => newItemTypeInner.nativeEvent.inputType !== "deleteContentBackward" ? setnewItemType(newItemType +newItemTypeInner.nativeEvent.data) : setnewItemType(newItemType.substring(0,newItemType.length-1))}></input>
        </div>
        <div className="overlay-field">
          <div className="overlay-label">Name: </div>
          <input className="overlay-input" value={newItemName || ""} onChange={newItemNameInner => newItemNameInner.nativeEvent.inputType !== "deleteContentBackward" ? setnewItemName(newItemName + newItemNameInner.nativeEvent.data) : setnewItemName(newItemName.substring(0,newItemName.length-1))}></input>
        </div>
        <div className="overlay-field">
          <div className="overlay-label">Count: </div>
          <input type="number" className="overlay-input" value={newItemCount || 0} onChange={newItemCountInner => setnewItemCount(newItemCountInner.nativeEvent.target.value)}></input>
        </div>
        <div className="overlay-button">
          <div className="submit-new-item" onClick={addNewItem}>Add New Item</div>
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
        {stockData.map((e,i) => {
          return <TableData key={i} name={e.name} type={e.type} count={e.type}/>
        })}
      </div>
    </div>
    </>
  );
}

export default StockTable;
