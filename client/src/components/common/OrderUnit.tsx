interface OrderUnitProps {
  orderNumber: number;
  accent?: true;
}
export const OrderUnit = ({
  orderNumber,
  accent,
}: OrderUnitProps): JSX.Element => {
  return (
    <span
      className={`mr-1 ${
        accent ? "bg-orange-500" : "bg-indigo-400"
      } text-white py-[2px] md:py-1 px-2 md:px-2 rounded-lg text-base shadow`}
    >
      {orderNumber}
    </span>
  );
};
