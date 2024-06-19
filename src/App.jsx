import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHousesAndSwornMembers = async () => {
      try {
        const response = await axios.get("https://anapioficeandfire.com/api/houses");
        const housesData = response.data;

        for (let house of housesData) {
          const swornMembersNames = [];
          for (let url of house.swornMembers) {
            try {
              const memberResponse = await axios.get(url);
              swornMembersNames.push(memberResponse.data.name);
            } catch (error) {
              console.log("Error fetching sworn member data", error);
              swornMembersNames.push("Unknown");
            }
          }
          house.swornMembersNames = swornMembersNames;
        }

        setData(housesData);
      } catch (err) {
        console.log("Error", err);
      }
    };

    fetchHousesAndSwornMembers();
  }, []);

  return (
    <>
      <h1>Techyon Table </h1>

      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>House Name</th>
              <th>Region</th>
              <th>Titles</th>
              <th>Sworn Members</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((houses, index) => (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{houses.name}</td>
                    <td>{houses.region}</td>
                    <td>{houses.titles.length > 0 ? houses.titles.join(" , ") : "None"}</td>
                    <td>{houses.swornMembersNames.length > 0 ? houses.swornMembersNames.join(' , ') : "None"}</td>
                  </tr>
                </>
              ))
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App
