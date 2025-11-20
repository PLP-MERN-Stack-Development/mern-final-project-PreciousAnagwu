import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EnvironmentalReport } from '@/types/report';

interface ReportStore {
  reports: EnvironmentalReport[];
  addReport: (report: Omit<EnvironmentalReport, 'id' | 'timestamp' | 'status'>) => void;
  updateReportStatus: (id: string, status: EnvironmentalReport['status']) => void;
  deleteReport: (id: string) => void;
  getReports: () => EnvironmentalReport[];
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set, get) => ({
      reports: [],
      addReport: (report) => {
        const newReport: EnvironmentalReport = {
          ...report,
          id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          status: 'pending',
        };
        set((state) => ({ reports: [...state.reports, newReport] }));
      },
      updateReportStatus: (id, status) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id ? { ...report, status } : report
          ),
        }));
      },
      deleteReport: (id) => {
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== id),
        }));
      },
      getReports: () => get().reports,
    }),
    {
      name: 'environmental-reports-storage',
    }
  )
);