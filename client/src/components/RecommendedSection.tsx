import { IRecommendedPreview, RecommendedPreview } from "./RecommendedPreview";

interface RecommendedSectionProps {
  recommendedSets: IRecommendedPreview[];
}
export const RecommendedSection = ({
  recommendedSets,
}: RecommendedSectionProps): JSX.Element => {
  return (
    <section className="mt-8">
      <h4 className="text-indigo-800 dark:text-indigo-200 text-2xl mb-4">
        Recommended Topics
      </h4>
      <div className="flex justify-start gap-6">
        {recommendedSets?.map((set) => (
          <RecommendedPreview data={set} key={set.id} />
        ))}
      </div>
    </section>
  );
};
