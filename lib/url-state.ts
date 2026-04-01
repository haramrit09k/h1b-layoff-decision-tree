import { UserInputs } from "@/data/visa-paths";

const PARAM_MAP = {
  layoffDate: "layoff",
  i94Expiry: "i94",
  spouseVisa: "spouse",
  i140Status: "i140",
  hasSchoolAcceptance: "school",
} as const;

export function encodeInputsToParams(inputs: UserInputs): URLSearchParams {
  const params = new URLSearchParams();
  params.set(PARAM_MAP.layoffDate, inputs.layoffDate);
  params.set(PARAM_MAP.i94Expiry, inputs.i94Expiry);
  params.set(PARAM_MAP.spouseVisa, inputs.spouseVisa);
  params.set(PARAM_MAP.i140Status, inputs.i140Status);
  params.set(PARAM_MAP.hasSchoolAcceptance, inputs.hasSchoolAcceptance ? "yes" : "no");
  return params;
}

export function decodeParamsToInputs(
  params: URLSearchParams
): UserInputs | null {
  const layoffDate = params.get(PARAM_MAP.layoffDate);
  const i94Expiry = params.get(PARAM_MAP.i94Expiry);
  const spouseVisa = params.get(PARAM_MAP.spouseVisa);
  const i140Status = params.get(PARAM_MAP.i140Status);
  const school = params.get(PARAM_MAP.hasSchoolAcceptance);

  if (!layoffDate || !i94Expiry) return null;

  const validSpouseVisa = ["H1B", "other", "none"].includes(spouseVisa ?? "")
    ? (spouseVisa as UserInputs["spouseVisa"])
    : "none";

  const validI140 = ["approved", "pending", "none", "unknown"].includes(
    i140Status ?? ""
  )
    ? (i140Status as UserInputs["i140Status"])
    : "unknown";

  return {
    layoffDate,
    i94Expiry,
    spouseVisa: validSpouseVisa,
    i140Status: validI140,
    hasSchoolAcceptance: school === "yes",
  };
}

export function buildResultsUrl(
  inputs: UserInputs,
  baseUrl = ""
): string {
  const params = encodeInputsToParams(inputs);
  return `${baseUrl}/results/?${params.toString()}`;
}
