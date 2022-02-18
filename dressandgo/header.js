import { Container, Navbar, Form, Row, Col, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css";

import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc'

function FilterDropdown(props) {
  const handlePriceUnder50 = () => {
    const ads = props.ads.filter(ads => ads.price <= 50.0);
    props.setFilter("price 0-50€");
    props.setFilterAds([]);

    ads.forEach((ad) => {
      props.setFilterAds(oldList => {
        return oldList.concat(ad);
      })
    })
  }

  const handlePriceOver50 = () => {
    const ads = props.ads.filter(ads => ads.price >= 50.0 && ads.price <= 100.0);
    props.setFilter("price 50-100€");
    props.setFilterAds([]);

    ads.forEach((ad) => {
      props.setFilterAds(oldList => {
        return oldList.concat(ad);
      })
    })
  }

  const handlePriceOver100 = () => {
    const ads = props.ads.filter(ads => ads.price >= 100.0);
    props.setFilter("price over 100€");
    props.setFilterAds([]);

    ads.forEach((ad) => {
      props.setFilterAds(oldList => {
        return oldList.concat(ad);
      })
    })
  }

  const handleRemove = () => {
    props.setFilter("nofilter");
    props.setFilterAds([]);
  }

  return (
    <InputGroup className="h-100">
      <DropdownButton
        variant="outline-secondary"
        title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
        </svg>}
        id="sort"
      >
        <Dropdown.Item disabled >Filter by:</Dropdown.Item>
        <Dropdown.Item onClick={handlePriceUnder50}>Price: 0-50€</Dropdown.Item>
        <Dropdown.Item onClick={handlePriceOver50}>Price: 50-100€</Dropdown.Item>
        <Dropdown.Item onClick={handlePriceOver100}>Price: {'>'}100€</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleRemove}>Remove filters</Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  )
}



function SortDropdown(props) {
  const handleDescendentPrice = () => {
    props.filter === "nofilter" ?
      props.setAds([].concat(props.ads).sort((a, b) => b.price - a.price))
      :
      props.setFilterAds([].concat(props.filterAds).sort((a, b) => b.price - a.price))
  }

  const handleAscendentPrice = () => {
    props.filter === "nofilter" ?
      props.setAds([].concat(props.ads).sort((a, b) => a.price - b.price))
      :
      props.setFilterAds([].concat(props.filterAds).sort((a, b) => a.price - b.price))
  }

  return (
    <InputGroup className="h-100">

      <DropdownButton
        variant="outline-secondary"
        title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
        </svg>}
        id="sort"
      >

        <Dropdown.Item disabled >Sort by:</Dropdown.Item>
        <Dropdown.Item onClick={handleAscendentPrice} >Price: Low to High</Dropdown.Item>
        <Dropdown.Item onClick={handleDescendentPrice}>Price: High to Low</Dropdown.Item>

      </DropdownButton>
    </InputGroup>
  )
}


function MyHeader(props) {
  const navigate = useNavigate();
  const initialStates = ["home", "faq", "chats", "rents", "account"]

  const handleChangeBackardPage = () => {
    props.setSearch("")
    let prev = null;
    let curr = null;
    let currParam = JSON.parse(localStorage.getItem("currParam"));

    if (props.historyStack.length === 0) {
      props.setCurrentCat("");
      localStorage.setItem("currentCat", "");

      props.historyStack.pop()
      localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
      props.setCurrentState("home")
      navigate("/previews");

    }
    switch (props.currentState) {

      case "cat":
        props.setCurrentCat("");
        localStorage.setItem("currentCat", "");

        props.historyStack.pop()
        localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
        props.setCurrentState("home")
        localStorage.setItem("currentState", "home");
        navigate("/previews");
        break;

      case "bigCat":
        prev = props.historyStack.pop()
        curr = props.historyStack[props.historyStack.length - 1]

        if (curr === "cat") {
          props.setCurrentState(curr);
          localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
          navigate("dresses/" + props.currentCat);
        }

        else if (curr === "bigCat") {
          props.setCurrentState("bigCat");
          localStorage.setItem("currentState", "bigCat");
          props.setCurrentCat(currParam.cat)
          localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
          navigate("ad/" + currParam.id);
        }
        else {
          props.setCurrentState("home");
          props.setCurrentCat("");

          localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
          navigate("previews");

        }

        break;

      case "chat":
        prev = props.historyStack.pop()
        curr = props.historyStack[props.historyStack.length - 1]

        console.log("from " + prev + " to " + curr)
        if (props.historyStack.length === 0) {
          const bottomNav = localStorage.getItem("currentBottomNav")
          if (prev === "chat") {
            if (bottomNav == 1) {
              console.log("vengo dalle faq");
              props.setCurrentState("faq");
              localStorage.setItem("currentState", "faq");
              localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
              navigate("/FAQ");
            }
            if (bottomNav == 2) {
              console.log("vengo dalle chats");
              props.setCurrentState("chats");
              localStorage.setItem("currentState", "chat");
              localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
              navigate("/MyChats");
            }
          }
        }
        else {

          if (curr === "chats") {
            props.setCurrentState("chats");
            localStorage.setItem("currentState", "chat");
            localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
            navigate("/MyChats");
          }


          else if (curr === "rent") {
            props.setCurrentState("rent");
            localStorage.setItem("currentState", "rent");
            localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
            navigate("MyRents/" + currParam.id);
          }

          else if (curr === "bigCat") {
            props.setCurrentState("bigCat");
            localStorage.setItem("currentState", "bigCat");
            props.setCurrentCat(currParam.cat)
            localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
            navigate("ad/" + currParam.id);
          }
        }


        break;

      case "rent":
        prev = props.historyStack.pop()
        curr = props.historyStack[props.historyStack.length - 1]

        if (prev === "rent") {
          props.setCurrentState("rents");
          localStorage.setItem("currentState", "rents");
          localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
          navigate("MyRents");
        }
        if (curr === "bigCat") {
          props.setCurrentState("bigCat");
          localStorage.setItem("currentState", "bigCat");
          localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
          navigate("ad/" + currParam.id);
        }
        else if (curr === "rents") {
          props.setCurrentState("rents");
          localStorage.setItem("currentState", "rent");
          localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
          navigate("/MyRents");
        }

        break;

      case "editProfile":
        prev = props.historyStack.pop();

        props.setCurrentState("account");
        localStorage.setItem("historyStack", "[]")
        localStorage.setItem("currentState", "account");
        navigate("/MyAccount");

        break;

      case "ks":
        prev = props.historyStack.pop();
        curr = props.historyStack[props.historyStack.length - 1]
        if (curr === "rent") {
          const idRent = localStorage.getItem("currParam").split(":")[1].replaceAll("}", "")
          props.setCurrentState("rent");
          localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
          localStorage.setItem("currentState", "rent");
          console.log(idRent)
          navigate("/MyRents/" + idRent);
        }
        else {
          props.setCurrentState("account");
          localStorage.setItem("historyStack", "[]")
          localStorage.setItem("currentState", "account");
          navigate("/MyAccount");
        }


        break;

      default:
        break;
    }