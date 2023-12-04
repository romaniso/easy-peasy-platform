import { Link } from "react-router-dom";
import Panel from "./Panel";
import RelationshipsImg from "../assets/images/vocabulary/realtionships.jpg";

function Recommended({ topics }) {
  return (
    <section className="mt-8">
      <h4 className="text-indigo-800 dark:text-indigo-200 text-2xl mb-4">
        Recommended Topics
      </h4>
      <div className="flex justify-start gap-6">
        <Panel className="basis-1/2 md:basis-1/5 bg-white flex justify-between items-center pr-0 transition-all duration-700 hover:scale-105">
          <div className="flex items-center gap-2">
            <div className="basis-1/3 shrink-0 overflow-hidden rounded">
              <img
                src={RelationshipsImg}
                alt=""
                className="w-full object-cover"
              />
            </div>
            <h5 className="text-indigo-800 dark:text-indigo-200 font-bold text-base">
              Relationships
            </h5>
          </div>
          <Link
            to="/"
            className="basis-1/5 rounded-l-3xl shrink-0 text-indigo-500 h-full bg-orange-500 flex items-center justify-center text-white shadow-md transition-colors hover:bg-indigo-600"
          >
            <h5>Go</h5>
          </Link>
        </Panel>
      </div>
    </section>
  );
}

export default Recommended;
