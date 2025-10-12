import { View, Text, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { speak, stop } from '../../services/tts';
import api from '../../api/client';
import { useRoute } from '@react-navigation/native';

export default function JobDetailsScreen() {
  const { params:{ job } } = useRoute();

  const handleApply = async () => {
    try { await api.post('/applications', { jobId: job._id }); alert('Applied'); }
    catch(e){ alert('Failed'); }
  };

  return (
    <ScrollView style={{ flex:1, backgroundColor:'#0b0f14', padding:12 }}>
      <Text style={{ color:'#fff', fontSize:22, fontWeight:'800' }}>{job.title}</Text>
      <Text style={{ color:'#9ca3af', marginVertical:6 }}>{job.category} • {job.locationName}</Text>
      <Text style={{ color:'#e5e7eb', marginVertical:8 }}>{job.description}</Text>
      <Button title="Read Aloud" onPress={()=> speak(`${job.title}. ${job.description}`)} />
      <Button title="Stop" onPress={stop} style={{ marginTop:8 }} />
      <Button title="Apply" onPress={handleApply} style={{ marginTop:8 }} />
    </ScrollView>
  );
}
