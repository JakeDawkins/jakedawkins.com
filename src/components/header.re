let se = ReasonReact.stringToElement;
let link = [%bs.raw {| require('react-router-dom').Link |}];

/* STYLES */
let wrapperStyle = ReactDOMRe.Style.make
  marginTop::"32px"
  width::"100%"
  maxWidth::"512px"
  display::"flex"
  alignItems::"center"
  justifyContent::"center"
  flexDirection::"column"
  ();
let headerStyle = ReactDOMRe.Style.make 
  letterSpacing::"1.2px" 
  backgroundColor::"white"
  padding::"8px 32px"
  textAlign::"center"
  fontWeight::"900"
  ();
let subHeaderStyle = ReactDOMRe.Style.make 
  textAlign::"center"
  backgroundColor::"white"
  padding::"4px 8px"
  marginBottom::"0px"
  letterSpacing::"1.2px"
  fontWeight::"300"
  ();


let component = ReasonReact.statelessComponent "Footer";
let makeHeader = fun ::heading ::subHeading _ => {
  ...component,
  render: fun self => {
    <div style=wrapperStyle>
    <link>
      <h1 style=headerStyle>
        (se heading)
      </h1>
    </link>
    <h3 style=subHeaderStyle>
      (se subHeading)
    </h3>
  </div>
  }
};

/* ======== EXPORT FOR REACT USE ======== */
let default =
  ReasonReact.wrapReasonForJs
  ::component 
  makeHeader;