//compoment for the navbar 

//to appease TS
interface navProp {
    name: string;
}

//compoment is dumb for now...
function NavBar(props: navProp) {
    return <h1 className="title-font bg-wblack text-white text-center text-3xl py-2 border-b-half border-wgray">{props.name}</h1>;
}

export default NavBar;
