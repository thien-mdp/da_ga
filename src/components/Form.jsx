const Form = ({ children, onSubmit }) => {
  return (
    <form
      className="w-[600px] p-10 border border-solid rounded-md"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
