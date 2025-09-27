export async function uploadEducationCertificate(req, res) {
  if (!req.file?.path) return res.status(400).json({ message: 'No file uploaded' });
  res.status(201).json({ certificateUrl: req.file.path });
}
