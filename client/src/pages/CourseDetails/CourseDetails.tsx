import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";

interface CourseInfoType {
  id: number;
  title: string;
  langugageFrom: {
      id: number,
      name: string
  },
  langugageTo: {
    id: number,
    name: string
  },
  categories: []
}

function CourseDetails(): ReactElement {
  const { id } = useParams<{ id?: string }>();
  const url = `https://localhost:5001/api/courses/${id}`;
  const [courseInfo, setCourseInfo] = useState<CourseInfoType | undefined>(
    undefined
  );

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCourseInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div className="CourseDetails">{courseInfo && courseInfo.title}</div>;
}

export default CourseDetails;
