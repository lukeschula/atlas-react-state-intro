import { useEffect } from "react";
import { useStae } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  const handleSort = (field) => {
    const newOrder = sort == field && direction === "asc" ? "desc" : "asc";
    setSort(field);
    setDirection(newOrder);
  };

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th
              className={sort === "trimester" ? "selected" : ""}
              onClick={() => handleSort("trimester")}
            >
              Trimester
            </th>
            <th
              className={sort === "courseNumber" ? "selected" : ""}
              onClick={() => handleSort("courseNumber")}
            >
              Course Number
            </th>
            <th
              className={sort === "courseName" ? "selected" : ""}
              onClick={() => handleSort("courseName")}
            >
              Courses Name
            </th>
            <th
              className={sort === "semesterCredits" ? "selected" : ""}
              onClick={() => handleSort("trimester")}
            >
              Semester Credits
            </th>
            <th
              className={sort === "totalClockHours" ? "selected" : ""}
              onClick={() => handleSort("trimester")}
            >
              Total Clock Hours
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>PP1000</td>
            <td>Beginning Procedural Programming</td>
            <td>2</td>
            <td>30</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>PP1100</td>
            <td>Basic Procedural Programming</td>
            <td>4</td>
            <td>50</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>OS1000</td>
            <td>Fundamentals of Open Source Operating Systems</td>
            <td>2.5</td>
            <td>37.5</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
