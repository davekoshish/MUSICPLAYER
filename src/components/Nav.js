import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export default function Nav({ libraryStatus, setlibraryStatus }) {
  return (
    <nav>
      <h1>Wave</h1>
      <button onClick={() => setlibraryStatus(!libraryStatus)}>
        Libary
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}
