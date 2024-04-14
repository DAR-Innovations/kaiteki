import subprocess

try:
    gpu_info_result = subprocess.run(["nvidia-smi"], capture_output=True, text=True, check=True)
    gpu_info = gpu_info_result.stdout
except subprocess.CalledProcessError:
    print('Not connected to a GPU')
else:
    print(gpu_info)
