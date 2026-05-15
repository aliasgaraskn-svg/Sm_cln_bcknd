export declare class ItsmTicket {
    id: string;
    category: string;
    priority: string;
    subject: string;
    description: string;
    status: string;
    assignedTo: string;
    date: string;
}
export declare class ItsmStats {
    openCount: number;
    inProgressCount: number;
    resolvedYtd: number;
    avgResolutionTime: string;
}
export declare class Asset {
    id: string;
    name: string;
    type: string;
}
export declare class ItsmDashboard {
    stats: ItsmStats;
    recentTickets: ItsmTicket[];
    myAssets: Asset[];
}
export declare class CreateTicketInput {
    category: string;
    priority: string;
    subject: string;
    description: string;
}
