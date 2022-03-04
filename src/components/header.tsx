//to appease TS
interface navProp {
    name: string;
}

function NavBar(props: navProp) {
    return <h1 className="title-font">{props.name}</h1>;
}

export default NavBar;
