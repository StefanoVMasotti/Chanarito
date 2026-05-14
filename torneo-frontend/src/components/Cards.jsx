function Card({ children }) {
  return (
    <div className="glass-panel fade-up flex flex-col items-center max-w-4xl mx-auto my-3 text-white p-6 md:p-8 rounded-3xl">
      {children}
    </div>
  );
}

export default Card;
