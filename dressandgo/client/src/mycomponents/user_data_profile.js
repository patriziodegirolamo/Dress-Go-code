import { Row, Container, Form, Button, Col, FloatingLabel } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


function MyUserData(props) {
  const navigate = useNavigate();

  /* MANCA IL CAP, INSERIRE ADDRESS2 NEL DB? */
  const [name, setName] = useState(props.user.name);
  const [surname, setSurname] = useState(props.user.surname);
  const [address, setAddress] = useState(props.user.address);
  const [city, setCity] = useState(props.user.city);
  const [state, setState] = useState(props.user.state);
  const [zip, setZip] = useState(props.user.zip);
  const [gender, setGender] = useState(props.user.gender);
  const [height, setHeight] = useState(props.user.height);
  const [weight, setWeight] = useState(props.user.setWeight);
  const [waistline, setWaistline] = useState(props.user.waistline);
  const [hips, setHips] = useState(props.user.hips);
  const [legLength, setLegLength] = useState(props.user.legLength);
  const [shoesNumber, setShoesNumber] = useState(props.user.shoesNumber);

  const handleModifyUser = (event) => {
    event.stopPropagation();
    event.preventDefault();

    /* TODO VALIDAZIONE */

    const newInfos = {
      id_u: props.user.id_u, name: name, surname: surname, address: address,
      city: city, state: state, zip: zip, gender: gender, height: height, weight: weight,
      waistline: waistline, hips: hips, legLength: legLength, shoesNumber: shoesNumber
    };

    props.modifyUserInfos(newInfos);
    props.setShowMyAlert(true);
    setTimeout(() => props.setShowMyAlert(false), 2000)
    
    props.setCurrentState("account")
    props.setHistoryStack("[]")
    localStorage.setItem("currentState","account");
    localStorage.setItem("historyStack","[]")
    navigate("/MyAccount")

  }

  return (
    <Container fluid>

      <Form className="mt-3">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder={props.user.name ? props.user.name : ''}
              onChange={ev => setName(ev.target.value)} />
          </Form.Group>


          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="surname" placeholder={props.user.surname ? props.user.surname : ''}
              onChange={ev => setSurname(ev.target.value)} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder={props.user.address ? props.user.address : ''}
            onChange={ev => setAddress(ev.target.value)} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control placeholder={props.user.city ? props.user.city : ''}
              onChange={ev => setCity(ev.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control placeholder={props.user.state ? props.user.state : ''}
              onChange={ev => setState(ev.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control placeholder={props.user.zip ? props.user.zip : ''}
              onChange={ev => setZip(ev.target.value)} />
          </Form.Group>
        </Row>


        <Row className="mt-4">

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Gender</Form.Label>
            <FloatingLabel controlId="floatingSelect" label={props.user.gender ? (props.user.gender === 1 ? 'Male' : (props.user.gender === 2 ? 'Female' : 'Other')) : ''}>
              <Form.Select aria-label={props.user.gender ? props.user.gender : ''} onChange={ev => setGender(ev.target.value)}>
                <option>---</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>


          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Height</Form.Label>
            <FloatingLabel controlId="floatingSelect" label={props.user.height ? props.user.height : ''}>
              <Form.Select placeholder={props.user.height ? props.user.height : ''} aria-label={props.user.height ? props.user.height : ''} onChange={ev => setHeight(ev.target.value)}>
                <option></option>
                <option value="140">140cm</option>
                <option value="141">141cm</option>
                <option value="142">142cm</option>
                <option value="143">143cm</option>
                <option value="144">144cm</option>
                <option value="145">145cm</option>
                <option value="146">146cm</option>
                <option value="147">147cm</option>
                <option value="148">148cm</option>
                <option value="149">149cm</option>
                <option value="150">150cm</option>
                <option value="151">151cm</option>
                <option value="152">152cm</option>
                <option value="153">153cm</option>
                <option value="154">154cm</option>
                <option value="155">155cm</option>
                <option value="156">156cm</option>
                <option value="157">157cm</option>
                <option value="158">158cm</option>
                <option value="159">159cm</option>
                <option value="160">160cm</option>


                <option value="161">161cm</option>
                <option value="162">162cm</option>
                <option value="163">163cm</option>
                <option value="164">164cm</option>
                <option value="165">165cm</option>
                <option value="166">166cm</option>
                <option value="167">167cm</option>
                <option value="168">168cm</option>
                <option value="169">169cm</option>
                <option value="170">170cm</option>

                <option value="171">171cm</option>
                <option value="172">172cm</option>
                <option value="173">173cm</option>
                <option value="174">174cm</option>
                <option value="175">175cm</option>
                <option value="176">176cm</option>
                <option value="177">177cm</option>
                <option value="178">178cm</option>
                <option value="179">179cm</option>
                <option value="180">180cm</option>

                <option value="181">181cm</option>
                <option value="182">182cm</option>
                <option value="183">183cm</option>
                <option value="184">184cm</option>
                <option value="185">185cm</option>
                <option value="186">186cm</option>
                <option value="187">187cm</option>
                <option value="188">188cm</option>
                <option value="189">189cm</option>
                <option value="190">190cm</option>

                <option value="191">191cm</option>
                <option value="192">192cm</option>
                <option value="193">193cm</option>
                <option value="194">194cm</option>
                <option value="195">195cm</option>
                <option value="196">196cm</option>
                <option value="197">197cm</option>
                <option value="198">198cm</option>
                <option value="199">199cm</option>
                <option value="200">200cm</option>

                <option value="201">201cm</option>
                <option value="202">202cm</option>
                <option value="203">203cm</option>
                <option value="204">204cm</option>
                <option value="205">205cm</option>
                <option value="206">206cm</option>
                <option value="207">207cm</option>
                <option value="208">208cm</option>
                <option value="209">209cm</option>
                <option value="210">210cm</option>

              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Weight</Form.Label>
            <FloatingLabel controlId="floatingSelect" label={props.user.weight ? props.user.weight : ''}>
              <Form.Select onChange={ev => setWeight(ev.target.value)}>
                <option></option>
                <option value="40">40kg</option>
                <option value="41">41kg</option>
                <option value="42">42kg</option>
                <option value="43">43kg</option>
                <option value="44">44kg</option>
                <option value="45">45kg</option>
                <option value="46">46kg</option>
                <option value="47">47kg</option>
                <option value="48">48kg</option>
                <option value="49">49kg</option>
                <option value="50">50kg</option>
                <option value="51">51kg</option>
                <option value="52">52kg</option>
                <option value="53">53kg</option>
                <option value="54">54kg</option>
                <option value="55">55kg</option>
                <option value="56">56kg</option>
                <option value="57">57kg</option>
                <option value="58">58kg</option>
                <option value="59">59kg</option>
                <option value="60">60kg</option>


                <option value="61">61kg</option>
                <option value="62">62kg</option>
                <option value="63">63kg</option>
                <option value="64">64kg</option>
                <option value="65">65kg</option>
                <option value="66">66kg</option>
                <option value="67">67kg</option>
                <option value="68">68kg</option>
                <option value="69">69kg</option>
                <option value="70">70kg</option>

                <option value="71">71kg</option>
                <option value="72">72kg</option>
                <option value="73">73kg</option>
                <option value="74">74kg</option>
                <option value="75">75kg</option>
                <option value="76">76kg</option>
                <option value="77">77kg</option>
                <option value="78">78kg</option>
                <option value="79">79kg</option>
                <option value="80">80kg</option>

                <option value="81">81kg</option>
                <option value="82">82kg</option>
                <option value="83">83kg</option>
                <option value="84">84kg</option>
                <option value="85">85kg</option>
                <option value="86">86kg</option>
                <option value="87">87kg</option>
                <option value="88">88kg</option>
                <option value="89">89kg</option>
                <option value="90">90kg</option>

                <option value="91">91kg</option>
                <option value="92">92kg</option>
                <option value="93">93kg</option>
                <option value="94">94kg</option>
                <option value="95">95kg</option>
                <option value="96">96kg</option>
                <option value="97">97kg</option>
                <option value="98">98kg</option>
                <option value="99">99kg</option>
                <option value="100">100kg</option>

                <option value="101">101kg</option>
                <option value="102">102kg</option>
                <option value="103">103kg</option>
                <option value="104">104kg</option>
                <option value="105">105kg</option>
                <option value="106">106kg</option>
                <option value="107">107kg</option>
                <option value="108">108kg</option>
                <option value="109">109kg</option>
                <option value="110">110kg</option>

                <option value="111">111kg</option>
                <option value="112">112kg</option>
                <option value="113">113kg</option>
                <option value="114">114kg</option>
                <option value="115">115kg</option>
                <option value="116">116kg</option>
                <option value="117">117kg</option>
                <option value="118">118kg</option>
                <option value="119">119kg</option>
                <option value="120">120kg</option>

                <option value="121">121kg</option>
                <option value="122">122kg</option>
                <option value="123">123kg</option>
                <option value="124">124kg</option>
                <option value="125">125kg</option>
                <option value="126">126kg</option>
                <option value="127">127kg</option>
                <option value="128">128kg</option>
                <option value="129">129kg</option>
                <option value="130">130kg</option>

                <option value="131">131kg</option>
                <option value="132">132kg</option>
                <option value="133">133kg</option>
                <option value="134">134kg</option>
                <option value="135">135kg</option>
                <option value="136">136kg</option>
                <option value="137">137kg</option>
                <option value="138">138kg</option>
                <option value="139">139kg</option>
                <option value="140">140kg</option>

                <option value="141">141kg</option>
                <option value="142">142kg</option>
                <option value="143">143kg</option>
                <option value="144">144kg</option>
                <option value="145">145kg</option>
                <option value="146">146kg</option>
                <option value="147">147kg</option>
                <option value="148">148kg</option>
                <option value="149">149kg</option>
                <option value="150">150kg</option>
                <option value="151">151kg</option>
                <option value="152">152kg</option>
                <option value="153">153kg</option>
                <option value="154">154kg</option>
                <option value="155">155kg</option>
                <option value="156">156kg</option>
                <option value="157">157kg</option>
                <option value="158">158kg</option>
                <option value="159">159kg</option>
                <option value="160">160kg</option>

                <option value="161">161kg</option>
                <option value="162">162kg</option>
                <option value="163">163kg</option>
                <option value="164">164kg</option>
                <option value="165">165kg</option>
                <option value="166">166kg</option>
                <option value="167">167kg</option>
                <option value="168">168kg</option>
                <option value="169">169kg</option>
                <option value="170">170kg</option>

                <option value="171">171kg</option>
                <option value="172">172kg</option>
                <option value="173">173kg</option>
                <option value="174">174kg</option>
                <option value="175">175kg</option>
                <option value="176">176kg</option>
                <option value="177">177kg</option>
                <option value="178">178kg</option>
                <option value="179">179kg</option>
                <option value="180">180kg</option>

                <option value="181">181kg</option>
                <option value="182">182kg</option>
                <option value="183">183kg</option>
                <option value="184">184kg</option>
                <option value="185">185kg</option>
                <option value="186">186kg</option>
                <option value="187">187kg</option>
                <option value="188">188kg</option>
                <option value="189">189kg</option>
                <option value="190">190kg</option>

                <option value="191">191kg</option>
                <option value="192">192kg</option>
                <option value="193">193kg</option>
                <option value="194">194kg</option>
                <option value="195">195kg</option>
                <option value="196">196kg</option>
                <option value="197">197kg</option>
                <option value="198">198kg</option>
                <option value="199">199kg</option>
                <option value="200">200kg</option>

              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Waistline</Form.Label>
            <FloatingLabel controlId="floatingSelect" label={props.user.waistline ? props.user.waistline : ''}>
              <Form.Select aria-label={props.user.waistline ? props.user.waistline : ''} onChange={ev => setWaistline(ev.target.value)}>
                <option></option>
                <option value="50">50cm</option>
                <option value="51">51cm</option>
                <option value="52">52cm</option>
                <option value="53">53cm</option>
                <option value="54">54cm</option>
                <option value="55">55cm</option>
                <option value="56">56cm</option>
                <option value="57">57cm</option>
                <option value="58">58cm</option>
                <option value="59">59cm</option>
                <option value="60">60cm</option>
                <option value="61">61cm</option>
                <option value="62">62cm</option>
                <option value="63">63cm</option>
                <option value="64">64cm</option>
                <option value="65">65cm</option>
                <option value="66">66cm</option>
                <option value="67">67cm</option>
                <option value="68">68cm</option>
                <option value="69">69cm</option>
                <option value="70">70cm</option>


                <option value="71">71cm</option>
                <option value="72">72cm</option>
                <option value="73">73cm</option>
                <option value="74">74cm</option>
                <option value="75">75cm</option>
                <option value="76">76cm</option>
                <option value="77">77cm</option>
                <option value="78">78cm</option>
                <option value="79">79cm</option>
                <option value="80">80cm</option>

                <option value="81">81cm</option>
                <option value="82">82cm</option>
                <option value="83">83cm</option>
                <option value="84">84cm</option>
                <option value="85">85cm</option>
                <option value="86">86cm</option>
                <option value="87">87cm</option>
                <option value="88">88cm</option>
                <option value="89">89cm</option>
                <option value="90">90cm</option>

                <option value="91">91cm</option>
                <option value="92">92cm</option>
                <option value="93">93cm</option>
                <option value="94">94cm</option>
                <option value="95">95cm</option>
                <option value="96">96cm</option>
                <option value="97">97cm</option>
                <option value="98">98cm</option>
                <option value="99">99cm</option>
                <option value="100">100cm</option>

                <option value="101">101cm</option>
                <option value="102">102cm</option>
                <option value="103">103cm</option>
                <option value="104">104cm</option>
                <option value="105">105cm</option>
                <option value="106">106cm</option>
                <option value="107">107cm</option>
                <option value="108">108cm</option>
                <option value="109">109cm</option>
                <option value="110">110cm</option>

                <option value="111">111cm</option>
                <option value="112">112cm</option>
                <option value="113">113cm</option>
                <option value="114">114cm</option>
                <option value="115">115cm</option>
                <option value="116">116cm</option>
                <option value="117">117cm</option>
                <option value="118">118cm</option>
                <option value="119">119cm</option>
                <option value="120">120cm</option>

              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Hips</Form.Label>

            <FloatingLabel controlId="floatingSelect" label={props.user.hips ? props.user.hips : ''}>
              <Form.Select aria-label={props.user.hips ? props.user.hips : ''} onChange={ev => setHips(ev.target.value)}>
                <option></option>
                <option value="50">50cm</option>
                <option value="51">51cm</option>
                <option value="52">52cm</option>
                <option value="53">53cm</option>
                <option value="54">54cm</option>
                <option value="55">55cm</option>
                <option value="56">56cm</option>
                <option value="57">57cm</option>
                <option value="58">58cm</option>
                <option value="59">59cm</option>
                <option value="60">60cm</option>
                <option value="61">61cm</option>
                <option value="62">62cm</option>
                <option value="63">63cm</option>
                <option value="64">64cm</option>
                <option value="65">65cm</option>
                <option value="66">66cm</option>
                <option value="67">67cm</option>
                <option value="68">68cm</option>
                <option value="69">69cm</option>
                <option value="70">70cm</option>


                <option value="71">71cm</option>
                <option value="72">72cm</option>
                <option value="73">73cm</option>
                <option value="74">74cm</option>
                <option value="75">75cm</option>
                <option value="76">76cm</option>
                <option value="77">77cm</option>
                <option value="78">78cm</option>
                <option value="79">79cm</option>
                <option value="80">80cm</option>

                <option value="81">81cm</option>
                <option value="82">82cm</option>
                <option value="83">83cm</option>
                <option value="84">84cm</option>
                <option value="85">85cm</option>
                <option value="86">86cm</option>
                <option value="87">87cm</option>
                <option value="88">88cm</option>
                <option value="89">89cm</option>
                <option value="90">90cm</option>

                <option value="91">91cm</option>
                <option value="92">92cm</option>
                <option value="93">93cm</option>
                <option value="94">94cm</option>
                <option value="95">95cm</option>
                <option value="96">96cm</option>
                <option value="97">97cm</option>
                <option value="98">98cm</option>
                <option value="99">99cm</option>
                <option value="100">100cm</option>

                <option value="101">101cm</option>
                <option value="102">102cm</option>
                <option value="103">103cm</option>
                <option value="104">104cm</option>
                <option value="105">105cm</option>
                <option value="106">106cm</option>
                <option value="107">107cm</option>
                <option value="108">108cm</option>
                <option value="109">109cm</option>
                <option value="110">110cm</option>

                <option value="111">111cm</option>
                <option value="112">112cm</option>
                <option value="113">113cm</option>
                <option value="114">114cm</option>
                <option value="115">115cm</option>
                <option value="116">116cm</option>
                <option value="117">117cm</option>
                <option value="118">118cm</option>
                <option value="119">119cm</option>
                <option value="120">120cm</option>

              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Leg length</Form.Label>



            <FloatingLabel controlId="floatingSelect" label={props.user.legLength ? props.user.legLength : ''}>
              <Form.Select aria-label={props.user.legLength ? props.user.legLength : ''} onChange={ev => setLegLength(ev.target.value)}>
                <option></option>
                <option value="50">50cm</option>
                <option value="51">51cm</option>
                <option value="52">52cm</option>
                <option value="53">53cm</option>
                <option value="54">54cm</option>
                <option value="55">55cm</option>
                <option value="56">56cm</option>
                <option value="57">57cm</option>
                <option value="58">58cm</option>
                <option value="59">59cm</option>
                <option value="60">60cm</option>
                <option value="61">61cm</option>
                <option value="62">62cm</option>
                <option value="63">63cm</option>
                <option value="64">64cm</option>
                <option value="65">65cm</option>
                <option value="66">66cm</option>
                <option value="67">67cm</option>
                <option value="68">68cm</option>
                <option value="69">69cm</option>
                <option value="70">70cm</option>


                <option value="71">71cm</option>
                <option value="72">72cm</option>
                <option value="73">73cm</option>
                <option value="74">74cm</option>
                <option value="75">75cm</option>
                <option value="76">76cm</option>
                <option value="77">77cm</option>
                <option value="78">78cm</option>
                <option value="79">79cm</option>
                <option value="80">80cm</option>

                <option value="81">81cm</option>
                <option value="82">82cm</option>
                <option value="83">83cm</option>
                <option value="84">84cm</option>
                <option value="85">85cm</option>
                <option value="86">86cm</option>
                <option value="87">87cm</option>
                <option value="88">88cm</option>
                <option value="89">89cm</option>
                <option value="90">90cm</option>

                <option value="91">91cm</option>
                <option value="92">92cm</option>
                <option value="93">93cm</option>
                <option value="94">94cm</option>
                <option value="95">95cm</option>
                <option value="96">96cm</option>
                <option value="97">97cm</option>
                <option value="98">98cm</option>
                <option value="99">99cm</option>
                <option value="100">100cm</option>

                <option value="101">101cm</option>
                <option value="102">102cm</option>
                <option value="103">103cm</option>
                <option value="104">104cm</option>
                <option value="105">105cm</option>
                <option value="106">106cm</option>
                <option value="107">107cm</option>
                <option value="108">108cm</option>
                <option value="109">109cm</option>
                <option value="110">110cm</option>

                <option value="111">111cm</option>
                <option value="112">112cm</option>
                <option value="113">113cm</option>
                <option value="114">114cm</option>
                <option value="115">115cm</option>
                <option value="116">116cm</option>
                <option value="117">117cm</option>
                <option value="118">118cm</option>
                <option value="119">119cm</option>
                <option value="120">120cm</option>

              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Shoe size (EU)</Form.Label>



          <FloatingLabel controlId="floatingSelect" label={props.user.shoesNumber ? props.user.shoesNumber : ''}>
            <Form.Select aria-label={props.user.shoesNumber ? props.user.shoesNumber : ''} onChange={ev => setShoesNumber(ev.target.value)}>
              <option></option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="32">32</option>
              <option value="33">33</option>
              <option value="34">34</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="47">47</option>
              <option value="48">48</option>
              <option value="49">49</option>
              <option value="50">50</option>



            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Row className="p-3 justify-content-center m-auto ">
          <Button className="mb-3" variant="primary" type="submit" onClick={handleModifyUser}>
            Change
          </Button>
        </Row>
      </Form>


    </Container>
  );
}
export default MyUserData;