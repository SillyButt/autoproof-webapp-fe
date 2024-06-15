export interface SnapshotDto {
  description: string;
  data: { filename: string; hash: string; }[];
  mode: string;
}

export interface CreteSnapshotResponse {
  result: boolean;
  message: string;
  snap_id: string;
}

export interface SnapshotResult {
  "id": string;
  "created_at": number;
  "live": boolean;
  "description": string;
  "legal_data": string;
  "status": string;
  "tech_message": string;
  "root_hash": string;
  "tech_logs": string[];
  "current_attempt": number;
  "tg_transaction_id": string;
  "link_id": string;
}
