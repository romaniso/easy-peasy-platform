import Button from "./Button";
import Input from "./Input";

function Footer() {
  const handleUserName = () => {};

  return (
    <footer className="bg-stone-800 text-white">
      <div className="md:flex md:justify-between md:items-center container mx-auto py-10 sm:px-12 px-4">
        <h3 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-light md:w-2/5">
          It is <span className="text-indigo-300 font-medium">never</span> too
          late to learn English!
        </h3>
        <div className="flex md:flex-row gap-4 items-center justify-between flex-col">
          <Input
            name="user"
            type="email"
            secondary
            outline
            rounded
            autoComplete="off"
            onChange={handleUserName}
            required
            className="sm:w-84 w-full"
          >
            Email
          </Input>
          <Button
            primary
            rounded
            outline
            className="whitespace-nowrap md:w-auto w-full"
          >
            Sign up
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
