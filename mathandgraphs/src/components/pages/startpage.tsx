import NavButton from "../global/navbutton";

function StartPage() {
    return(
        <div id="startPageWrapper">
            <main>
                <h1>Math related projects</h1>
                <h2>Here you can find all my projects related to math and graphing</h2>
            </main>
            <NavButton className="navButton" text="Show me" link="projects" />
        </div>
    );
}

export default StartPage;