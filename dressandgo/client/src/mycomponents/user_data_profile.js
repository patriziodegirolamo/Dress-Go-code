import { Row, Container, Form, Button, Col } from "react-bootstrap";
import { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";


function MyUserData(props) {
  /* MANCA IL CAP, INSERIRE ADDRESS2 NEL DB? */
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [gender, setGender] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [waistline, setWaistline] = useState();
  const [hips, setHips] = useState();
  const [legLength, setLegLength] = useState();
  const [shoesNumber, setShoesNumber] = useState();

  const handleModifyUser = (event) => {
    event.stopPropagation();
    event.preventDefault();

    /* TODO VALIDAZIONE */
    
    if(name === undefined) setName(props.user.name);
    if(surname === undefined) setSurname(props.user.surname);
    if(address === undefined) setAddress(props.user.address);
    if(city === undefined) setCity(props.user.city);
    if(state === undefined) setState(props.user.state);
    if(zip === undefined) setZip(props.user.zip);
    if(gender === undefined) setGender(props.user.gender);
    if(height === undefined) setHeight(props.user.height);
    if(weight === undefined) setWeight(props.user.weight);
    if(waistline === undefined) setWaistline(props.user.waistline);
    if(hips === undefined) setHips(props.user.hips);
    if(legLength === undefined) setLegLength(props.user.legLength);
    if(shoesNumber === undefined) setShoesNumber(props.user.shoesNumber);

    const newInfos = {id_u: props.user.id_u, name : name, surname: surname, address: address, 
                      city: city, state: state, zip: zip, gender: gender, height: height, weight: weight,
                      waistline: waistline, hips: hips, legLength: legLength, shoesNumber: shoesNumber};
    props.modifyUserInfos(newInfos);
}

  return (
    <Container fluid>

      <Form className="mt-3">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder={props.user.name === 'NULL' ? 'Name' : props.user.name} 
                           onChange={ev => setName(ev.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="password" placeholder={props.user.surname === 'NULL' ? 'Surname' : props.user.surname} 
                           onChange={ev => setSurname(ev.target.value)}/>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder={props.user.address === 'NULL' ? 'Address' : props.user.address}
                         onChange={ev => setAddress(ev.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control placeholder = {props.user.city === 'NULL' ? '' : props.user.city}
                           onChange={ev => setCity(ev.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control placeholder = {props.user.state === 'NULL' ? '' : props.user.state}
                           onChange={ev => setState(ev.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control  placeholder = {props.user.zip === 'NULL' ? '' : props.user.zip}
                            onChange={ev => setZip(ev.target.value)}/>
          </Form.Group>
        </Row>


        <Row className="mt-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label={props.user.gender === 'NULL' ? '' : props.user.gender}  onChange={ev => setGender(ev.target.value)}>
              <option>---</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Height*</Form.Label>
            <Form.Select aria-label={props.user.height === 'NULL' ? '' : props.user.height}  onChange={ev => setHeight(ev.target.value)}>
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
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Weight(kg)*</Form.Label>
            <Form.Control  placeholder = {props.user.weight === 'NULL' ? '' : props.user.weight}
                           onChange={ev => setWeight(ev.target.value)}/>
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Waistline(cm)</Form.Label>
            <Form.Select aria-label= {props.user.waistline === 'NULL' ? '' : props.user.waistline}  onChange={ev => setWaistline(ev.target.value)}>
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
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Hips(cm)</Form.Label>
            <Form.Control  placeholder = {props.user.hips === 'NULL' ? '' : props.user.hips}
                            onChange={ev => setHips(ev.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Leg length</Form.Label>
            <Form.Control  placeholder = {props.user.legLength === 'NULL' ? '' : props.user.legLength}
                           onChange={ev => setLegLength(ev.target.value)}/>
          </Form.Group>
        </Row>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Shoe size (EU)</Form.Label>
          <Form.Control  placeholder = {props.user.shoesNumber === 'NULL' ? '' : props.user.shoesNumber}
                          onChange={ev => setShoesNumber(ev.target.value)}/>
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