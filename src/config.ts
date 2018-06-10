import { readAwsSecretsForStage } from '@hollowverse/utils/helpers/readAwsSecretsForStage';

export const getConfig = async () => {
  const secrets = await readAwsSecretsForStage([
    'wpt/apiKey',
    'google/searchConsoleApis/apiKey',
    'splunk/httpCollector/perfReports/token',
  ]);

  return {
    webpagetest: {
      apiKey: secrets['wpt/apiKey'],
    },
    google: {
      apiKey: secrets['google/searchConsoleApis/apiKey'],
    },
    splunk: {
      token: secrets['splunk/httpCollector/perfReports/token'],
    },
    screenshotsBucket: process.env.SCREENSHOTS_BUCKET_NAME,
  };
};

type UnboxPromise<T> = T extends Promise<infer R> ? R : T;

export type GlobalConfig = UnboxPromise<ReturnType<typeof getConfig>>;
