cd ../
mkdir output
cp -R ./CreaviSpace-FrontEnd/* ./output
cp -F ./CreaviSpace-FrontEnd/.github/workflows/deploy.yaml ./output
cp -R ./output ./CreaviSpace-FrontEnd/
