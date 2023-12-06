export interface Camp {
  bannerImage: string;
  campId: number;
  campName: string;
  content: string | null;
  masterId: number;
  subscriptionCount: number;
}

export interface CampEditable {
  userName: string;
  profileUrl: string;
}
