import React from "react";
import './tables.style.css';

function TablesUsers(props) {

    return (
        <div class="table-users">  
            <table cellspacing="0">
                <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th width="230">Comments</th>
                    <th width="100">Action</th>
                </tr>

                <tr>
                    <td><img src="http://lorempixel.com/100/100/people/1" alt="" /></td>
                    <td>Jane Doe</td>
                    <td>jane.doe@foo.com</td>
                    <td>01 800 2000</td>
                    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </td>
                    <td><button>Block</button></td>
                </tr>
            </table>
        </div>
    );
}