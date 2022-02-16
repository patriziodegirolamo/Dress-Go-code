import { Container, Navbar, Form, Row, Col, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

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
        props.setFilter(true);
        return oldList.concat(ad);
      })
    })
  }

  const handleRemove = () => {
    props.setFilter(false);
    props.setFilterAds([]);
  }

  return (
    <InputGroup className="mb-3">
      <DropdownButton
        variant="outline-secondary"
        title="Filter by"
        id="sort"
      >
        <Dropdown.Item onClick={handlePriceUnder50}>Price: 0-50€</Dropdown.Item>
        <Dropdown.Item onClick={handlePriceOver50}>Price: 50-100€</Dropdown.Item>
        <Dropdown.Item onClick={handlePriceOver100}>Price: {'>'}100€</Dropdown.Item>
        <Dropdown.Item onClick={handleRemove}>Remove filters</Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  )
}



function SortDropdown(props) {
  const handleDescendentPrice = () => {
    props.setAds([].concat(props.ads).sort((a, b) => b.price - a.price));
  }

  const handleAscendentPrice = () => {
    props.setAds([].concat(props.ads).sort((a, b) => a.price - b.price));
  }

  return (
    <InputGroup className="h-100">

      <DropdownButton
        variant="outline-secondary"
        title="Sort by"
        id="sort"
      >
        <Dropdown.Item onClick={handleAscendentPrice}>Price: Low to High</Dropdown.Item>
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

        if (props.historyStack.length === 0) {
          if (prev === "chat") {
            props.setCurrentState("chats");
            localStorage.setItem("currentState", "chat");
            localStorage.setItem("historyStack", JSON.stringify(props.historyStack))
            navigate("/MyChats");
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
        props.setCurrentState("account");
        localStorage.setItem("historyStack", "[]")
        localStorage.setItem("currentState", "account");
        navigate("/MyAccount");

        break;

      default:
        break;
    }



  };


  return (
    <>
      <Navbar>
        {initialStates.includes(props.currentState) ?
          <></>
          :
          <Button id="back-button" size="sm" variant="light" onClick={handleChangeBackardPage}>
            <IoArrowBackCircleOutline style={{ color: "rgb(70, 133, 204)", fontSize: "2.5em" }} />
          </Button>
        }
        <Container>
          <Navbar.Brand className='m-auto'>
            <a style={{ textDecoration: "none" }} href="/previews"><b id="title" style={{ color: "rgb(70, 133, 204)" }}>Dress&Go</b>
              {props.currentState === "home" || props.currentState === "cat" || props.currentState === "bigCat" ?
                <sub id="pedice" style={{ color: "rgb(70, 133, 204)" }}><i>{props.page}</i></sub> : <></>}
            </a>
          </Navbar.Brand>

        </Container>

      </Navbar>

      {props.currentState === "home" || props.currentState === "cat" ?
        <Container>
          <Row>
            <Col xs={props.currentState === "home" ? 6 : 6}>
              <Form id="formFilterDress" onSubmit={e => { e.preventDefault(); }} >
                <Form.Control style={{ height: 54 }} value={props.search} placeholder="Search a product..." onChange={(event) => {
                  event.preventDefault();
                  props.setSearch(event.target.value);
                }}
                />

              </Form>
            </Col>

            {props.currentState === "home" ? <>

              {
                props.page === "man" ?
                  <Col xs={2}>
                    <Button className="border border-success" style={{ backgroundColor: "white" }} size="lg" variant="light" disabled>
                      <FcBusinessman size={35}></FcBusinessman>
                    </Button>
                  </Col>
                  :
                  <Col xs={2}>
                    <Button style={{ backgroundColor: "white" }} size="lg" variant="light" onClick={(event) => {
                      handleChangeBackardPage()
                      props.setPage("man");
                      localStorage.setItem("page", "man");
                    }}>
                      <FcBusinessman size={30}></FcBusinessman>
                    </Button>
                  </Col>
              }

              {
                props.page === "woman" ?
                  <Col xs={2}>
                    <Button className="border border-success" style={{ backgroundColor: "white" }} size="lg" variant="light" disabled>
                      <FcBusinesswoman size={35}></FcBusinesswoman>
                    </Button>
                  </Col>
                  :
                  <Col xs={2}>
                    <Button style={{ backgroundColor: "white" }} size="lg" variant="light" onClick={(event) => {
                      handleChangeBackardPage()
                      props.setPage("woman");
                      localStorage.setItem("page", "woman");
                    }}>
                      <FcBusinesswoman size={30}></FcBusinesswoman>
                    </Button>
                  </Col>
              }
            </> : <>

              <Col xs={2}>
                <FilterDropdown ads={props.ads.filter(ad => (
                  props.categories.find((el) => el.id_cat === ad.id_cat).name === props.currentCat))} filterAds={props.filterAds} setFilterAds={props.setFilterAds} 
                  setFilter = {props.setFilter}/>
              </Col>
              <Col xs={2}>
                <SortDropdown ads={props.ads} setAds={props.setAds} />
              </Col>

            </>}

          </Row>
        </Container>
        : <></>}
    </>
  );
}

export default MyHeader;
