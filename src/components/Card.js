import { Link } from "react-router-dom";
import Button from "./Button";
import Panel from "./Panel";

function Card({ title, text, image }) {
  return (
    <Panel className="bg-slate-100 flex flex-col md:max-w-xs">
      {image && (
        <div className="h-28">
          <img
            src={image}
            alt="decor of the card"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div className="p-5 flex-col items-center gap-3 flex-auto">
        <h3
          className="font-semibold text-2xl overflow overflow-ellipsis whitespace-nowrap text-indigo-900 text-center"
          title={title}
        >
          {title}
        </h3>
        <p className="text-md text-center text-orange-500">{text}</p>
      </div>
      <Link to={`/exercises/${title.toLowerCase()}`}>
        <Button primary outline rounded className="w-full">
          Check it out
        </Button>
      </Link>
    </Panel>
  );
}

export default Card;
