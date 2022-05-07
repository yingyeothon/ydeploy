import DBDistribution from "../../repository/distribution/DBDistribution";
import Distribution from "./Distribution";

export default function mapDistributionToModel(
  dbDistribution: DBDistribution
): Distribution {
  return {
    distributionId: dbDistribution.distribution_id,
    name: dbDistribution.name,
    uploadPath: dbDistribution.upload_path,
    version: dbDistribution.version,
    description: dbDistribution.description,
    createdAt: dbDistribution.created_at,
    updatedAt: dbDistribution.updated_at,
  };
}
