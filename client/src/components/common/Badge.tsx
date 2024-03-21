interface Props {
  accent?: true;
  children: string;
}

export const Badge = ({ children, accent }: Props) => {
  return (
    <span
      className={`${
        accent ? "bg-orange-500" : "bg-indigo-500"
      } py-1 px-2 rounded-md text-sm font-semibold text-white shadow-md`}
    >
      {children}
    </span>
  );
};
