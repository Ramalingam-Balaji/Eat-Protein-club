import { CATEGORIES } from "../data/homeData";
import SectionTag from "./SectionTag";
import { useNavigate } from "react-router-dom";

export default function FoodCategories() {
  const navigate = useNavigate();

  return (
    <section id="foods" className="scroll-mt-20 bg-white px-5 py-7">
      <div className="mx-auto max-w-[1400px]">
        {/* Responsive Section Heading */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div className="min-w-0 flex-1">
            <SectionTag>Discover & Choose</SectionTag>

            <h2 className="mt-3 text-[28px] font-black leading-tight text-protein-dark sm:text-[31px]">
              High Protein Foods from Local Stores
            </h2>

            <p className="mt-1 max-w-[700px] text-sm leading-relaxed text-protein-muted">
              Explore a wide range of protein-rich foods available in stores
              near you. Each product comes with nutrition intelligence to help
              you make the right choice.
            </p>
          </div>
        </div>

        {/* Food Category Cards */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category.title}
              onClick={() => navigate("")}
              aria-label={`Explore ${category.title}`}
              className="group overflow-hidden rounded-xl border border-protein-border/80 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-protein-green/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-protein-green"
            >
              {/* Category Image */}
              <div className="h-[110px] overflow-hidden bg-protein-surface">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Category Title */}
              <div className="flex min-h-[50px] items-center justify-center p-2 text-center">
                <span className="text-[12px] font-bold leading-3 text-protein-dark">
                  {category.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
