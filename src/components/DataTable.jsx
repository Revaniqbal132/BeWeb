import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronUp, ChevronDown, Download } from 'lucide-react';


const DataTable = ({ 
  data = [], 
  title = "Data Table",
  itemsPerPage = 10,
  searchPlaceholder = "Cari...",
  searchFields = ['fullname', 'email', 'reason'],
  onRowClick = null,
  enableExport = true,
  exportFileName = "exported-data",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approve':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reject':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    const filteredData = data.filter(item => 
      searchFields.some(field => 
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const totalPages = Math.ceil(getSortedData().length / itemsPerPage);
  const paginatedData = getSortedData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="pl-8 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th 
                  className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => sortData('fullname')}
                >
                  <div className="flex items-center gap-1">
                    Nama
                    <SortIcon columnKey="fullname" />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-gray-600">Email</th>
                <th 
                  className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => sortData('startDate')}
                >
                  <div className="flex items-center gap-1">
                    Tanggal Mulai
                    <SortIcon columnKey="startDate" />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-gray-600">Tanggal Selesai</th>
                <th className="p-3 text-left font-medium text-gray-600">Durasi</th>
                <th className="p-3 text-left font-medium text-gray-600">Alasan</th>
                <th 
                  className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => sortData('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <SortIcon columnKey="status" />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-gray-600">Sisa Cuti</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr 
                  key={item.id}
                  className={`border-t border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  <td className="p-3 font-medium">{item.fullname}</td>
                  <td className="p-3 text-gray-600">{item.email}</td>
                  <td className="p-3">{formatDate(item.startDate)}</td>
                  <td className="p-3">{formatDate(item.endDate)}</td>
                  <td className="p-3">{item.amount} hari</td>
                  <td className="p-3">{item.reason}</td>
                  <td className="p-3">
                    <Badge className={`${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-3">{item.totalCuti} hari</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;