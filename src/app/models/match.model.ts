export class MatchModel {
  id!: string;
  name!: string;
  matchType!: string;
  status!: string;
  venue!: string;
  date!: string;
  dateTimeGMT!: string;
  teams!: string[];
  // teamInfo!: TeamInfo[];
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}
