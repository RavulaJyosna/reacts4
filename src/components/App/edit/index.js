import React from "react";



class Edit extends React.Component {
    render() {
        return(
            <section>
                <h3>Edit Details</h3>
                <input type="text" name="name"/>
                <input type="text" name="alias"/>
                <input type="text" name="team"/>
            </section>
        )
    }
}

export default Edit;