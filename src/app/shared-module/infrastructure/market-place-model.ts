export interface Root {
    status: string;
    records: Marketplacemodel[];
  }
  
  export interface Marketplacemodel {
    _id: string;
    original_model_name: string;
    docker_image_name: string;
    docker_training_endpoint: string;
    docker_prediction_endpoint: string;
    trainable: boolean;
    container_model_map_path: string;
    training_params: string[];
    prediction_params: string[];
    created_date_time: string;
    updated_date_time: string;
    request_json: string;
    response_json: string;
    model_description: string;
  }