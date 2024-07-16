import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [first, setfirst] = useState(false);
  const [responseObj, setResponseObj] = useState([]);
  const [productCatList, setProductCatList] = useState([]);

  const m = [{ abb: "hello" }, { abb: "bello" }];

  const getResponse = () => {
    console.log("rejfn");
    setfirst(true);
    var data = {
      accept: "*/*",
    };
    axios
      .get(
        "https://ecommerce-ijaa.onrender.com/product-category/getAllCategories"
      )
      .then((response) => {
        console.log("response => ", response);
        setResponseObj(response.data);
      })
      .catch((err) => {
        console.log("caught an error => ", err.message);
      })
      .finally((e) => {
        setfirst(false);
      });
  };

  useEffect(() => {
    console.log("responseObj = ", responseObj?.result?.StatusCode);
    if (responseObj?.result?.StatusCode) setProductCatList(responseObj.data);
  }, [responseObj]);

  useEffect(() => {
    console.log("productCatList = ", productCatList);
    productCatList.forEach((productCat) => console.log(productCat));
  }, [productCatList]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button
        className="mt-2 ml-2 p-2 bg-slate-200 rounded-md hover:bg-slate-400"
        onClick={getResponse}
      >
        Click to get log
      </button>
      {console.log("hrtghyrjn = ", productCatList)}
      {first ? (
        <p>fetching..</p>
      ) : (
        <ul>
          {productCatList.map((item, index) => (
            <li key={index}>{JSON.stringify(item.category_name)}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
