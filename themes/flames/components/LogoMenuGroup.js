const MenuGroup = ({ title, children,text_color }) => {
  return (
    <div className="flex flex-col">
      <div className={`mt-2 mb-0 ml-4 mr-0 transition-300 font-bold ${text_color}`}>{title}</div>
      <div className="flex flex-row flex-wrap w-[340px] justify-between">{children}</div>
    </div>
  );
};

export default MenuGroup;