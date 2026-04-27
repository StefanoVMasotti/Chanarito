function Card({ children }) {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto my-2 text-white bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg">
      {children}
    </div>
  );
}

export default Card;
