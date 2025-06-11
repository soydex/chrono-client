import ClientAutocomplete from '../components/ClientAutocomplete';
import { useForm } from 'react-hook-form';

export default function TestClientAutocomplete() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const selectedClient = watch('client');

  const onSubmit = (data) => {
    console.log('Formulaire soumis :', data);
    alert(`Client sélectionné : ${JSON.stringify(data.client, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-4">Test – ClientAutocomplete</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Client</label>
          <ClientAutocomplete
            value={selectedClient}
            onSelect={(client) => setValue('client', client)}
          />
          <input type="hidden" {...register('client')} />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
