import { View, Text, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import api from '../../api/client';
import { start, stop } from '../../services/stt';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

export default function CreateJobScreen() {
  const { control, handleSubmit } = useForm();
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  const onSubmit = async (data) => {
    const job = await api.post('/jobs', data).then(r=>r.data.data);
    const session = await api.post('/payments/job-post/create-session', { jobId: job._id }).then(r=>r.data.data);
    setCheckoutUrl(session.url);
  };

  if (checkoutUrl) {
    return <WebView source={{ uri: checkoutUrl }} style={{ flex:1 }} />;
  }

  return (
    <ScrollView style={{ flex:1, backgroundColor:'#0b0f14', padding:12 }}>
      <Text style={{ color:'#fff', fontSize:22, fontWeight:'800' }}>Create Job</Text>
      <Controller name="title" control={control} render={({ field:{ onChange, value }}) => (
        <Input label="Title" value={value} onChangeText={onChange} />
      )}/>
      <Controller name="description" control={control} render={({ field }) => (
        <Input label="Description" multiline numberOfLines={4} {...field}/>
      )}/>
      <Controller name="category" control={control} render={({ field }) => (
        <Select label="Category" selectedValue={field.value} onValueChange={field.onChange} items={[
          { label:'Farming', value:'Farming' }, { label:'Carpentry', value:'Carpentry' }, { label:'Construction', value:'Construction' }
        ]}/>
      )}/>
      <Button title="Voice Fill (start)" onPress={()=> start()} />
      <Button title="Voice Fill (stop)" onPress={()=> stop()} style={{ marginTop:8 }} />
      <Button title="Pay & Submit" onPress={handleSubmit(onSubmit)} style={{ marginTop:8 }} />
    </ScrollView>
  );
}
