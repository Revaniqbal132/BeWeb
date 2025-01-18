import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  Building2, 
  Clock, 
  CreditCard, 
  Briefcase,
  AlertCircle,
  CheckCircle,
  Wallet
} from 'lucide-react';

const EmployeeDetail = ({ data }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
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

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detail Pengajuan Cuti</h1>
        <Badge className={`${getStatusColor(data.status)} text-sm`}>
          {data.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Informasi Pribadi
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Nama Lengkap:</span>
              <span className="font-medium">{data.fullname}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Role:</span>
              <span className="font-medium capitalize">{data.role}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Bank:</span>
              <span className="font-medium">{data.bank}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">No. Rekening:</span>
              <span className="font-medium">{data.accountNumber || '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Gaji:</span>
              <span className="font-medium">{formatCurrency(data.salary)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Detail Pengajuan
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Tanggal Mulai:</span>
              <span className="font-medium">{formatDate(data.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Tanggal Selesai:</span>
              <span className="font-medium">{formatDate(data.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Durasi:</span>
              <span className="font-medium">{data.amount} hari</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Alasan:</span>
              <span className="font-medium">{data.reason}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Jenis Cuti:</span>
              <span className="font-medium capitalize">{data.jenisCuti}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Sisa Cuti:</span>
              <span className="font-medium">{data.totalCuti} hari</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Informasi Waktu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Waktu Pengajuan:</span>
            <span className="font-medium">
              {new Date(data.timeStamp.seconds * 1000).toLocaleString('id-ID')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetail;