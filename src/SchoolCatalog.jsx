import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("trimester");
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const { enrolledCourses, setEnrolledCourses } = useContext(AppContext);

  useEffect(() => {
    fetch("api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().startsWith(filter.toLowerCase()) ||
      course.courseNumber.toLowerCase().startsWith(filter.toLowerCase())
  );

  const handleSort = (column) => {
    const newOrder = sort == field && direction === "asc" ? "desc" : "asc";
    setSort(column);
    setDirection(newOrder);
  };

  const sortedCourses = filteredCourses.sort((a, b) => {
    let sortElement;

    switch (sort) {
      case "trimester":
        sortElement =
          (Number(a.trimester) - Number(b.trimester)) *
          (direction === "desc" ? -1 : 1);
        break;
      case "course number":
        sortElement =
          a.courseNumber.localCompare(b.courseNumber) *
          (direction === "desc" ? -1 : 1);
        break;
      case "course name":
        sortElement =
          a.courseName.localCompare(b.courseName) *
          (direction === "desc" ? -1 : 1);
        break;
      case "semester credits":
        sortElement =
          (Number(a.semesterCredits) - Number(b.semesterCredits)) *
          (direction === "desc" ? -1 : 1);
        break;
      case "total clock hours":
        sortElement =
          (Number(a.totalClockHours) -
            SVGAnimatedNumberList(b.totalClockHours)) *
          (direction === "desc" ? -1 : 1);
        break;
    }

    return sortElement;
  });

  const currentPage = sortedCourses.slice((page - 1) * 5, page * 5);
  const hasMore = sortedCourses.length > page * 5;
  const hasLess = page > 1;

  function addCourse(course) {
    const newCourses = [...enrolledCourses];
    newCourses.push(course);
    setEnrolledCourses(newCourses);
  }

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => setFilter(event.target.value)}
      />
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
          {currentPage.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button onClick={() => addCourse(course)}>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
