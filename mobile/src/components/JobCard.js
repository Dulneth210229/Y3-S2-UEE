import { View, Text, TouchableOpacity } from 'react-native';
import { money } from '../utils/formatters';
export default function JobCard({ job, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor:'#111827', padding:14, borderRadius:16, marginVertical:8 }}>
      <Text style={{ color:'#fff', fontSize:16, fontWeight:'700' }}>{job.title}</Text>
      <Text style={{ color:'#9ca3af', marginTop:4 }}>{job.category} • {job.locationName || '—'}</Text>
      <Text style={{ color:'#e5e7eb', marginTop:6 }}>{money(job.payMin)} - {money(job.payMax)}</Text>
    </TouchableOpacity>
  );
}
