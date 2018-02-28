let se = ReasonReact.stringToElement;
  
/* ======== STYLES ========*/
let wrapperStyle = ReactDOMRe.Style.make 
  marginTop::"32px"
  width::"100%"
  maxWidth::"512px"
  display::"flex"
  alignItems::"center"
  justifyContent::"center"
  flexDirection::"column"
  marginBottom::"32px" /* unique for footer */ 
  (); 
let textStyle = ReactDOMRe.Style.make letterSpacing::"1.2px" ();
let harambeStyle = ReactDOMRe.Style.make textDecoration::"none" ();

/* ======== COMPONENT ======== */
let component = ReasonReact.statelessComponent "Footer";
let makeFooter = fun children => {
  ...component,
  render: fun self => {
    <div style=wrapperStyle >
      <small style=textStyle >
        (se {j|©2017 Jake Dawkins. It's okay. You can |j})
        <a href="https://github.com/jakedawkins/jakedawkins.com">
          (se "steal this.")
        </a>
        <a
          href="https://en.wikipedia.org/wiki/Killing_of_Harambe"
          style=harambeStyle
        >
          <span role="img" label="monkey">
            (se {j| 🐒|j})
          </span>
        </a>
      </small>
    </div>
  }
};

/* ======== EXPORT FOR REACT USE ======== */
let default =
  ReasonReact.wrapReasonForJs
  ::component
  makeFooter;