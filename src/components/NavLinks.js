import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../features/context";
import {
  TeacherNavLinks,
  StudentNavLinks,
  AdminNavLinks,
} from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const { user } = useGlobalContext();
  const { _id: userId, role } = user;

  const [links, setLinks] = useState([...StudentNavLinks]);
  useEffect(() => {
    if (role === 1) {
      setLinks([...TeacherNavLinks]);
    } else if (role === 0) {
      setLinks([...StudentNavLinks]);
    } else if (role === 5) {
      setLinks([...AdminNavLinks]);
    }
  }, []);

  return (
    <div>
      <div>
        {links.map((link) => {
          const { text, path, icon } = link;
          return (
            <NavLink
              to={path}
              key={text}
              className={({ isActive }) =>
                isActive
                  ? "text-green-900 font-bold flex items-center gap-x-2 py-4"
                  : "text-gray-600 flex items-center gap-x-2 py-4 hover:text-green-500"
              }
              end
            >
              <div>{icon}</div>
              <div>{text}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default NavLinks;
