import { AboutHabits } from "../Data/data"


export const About = () => {
  return (
      <div className="container">
        <div className="mb-10 text-center">
          <h1 className="font-bold text-3xl md:text-4xl mb-4">Master Habits with Confidence</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Unlock the full potential of your daily routine using tools built to inspire discipline and transformation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AboutHabits.map((item, index) => (
            <div key={index} className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl text-secondary mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
  );
};
